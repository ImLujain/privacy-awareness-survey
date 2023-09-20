<template>
  <div class="container mt-5">
    <p class="h4">Do you want to see your web fingerprint?</p>
    <button @click="getFingerprint" class="btn btn-primary mt-3">YES</button>
    <button @click="goToFinalSurvey" class="btn btn-secondary mt-3">Go to Final Survey</button>
    <div v-if="fingerprint" class="mt-4">
      <p class="h5"><strong>Visitor ID:</strong> {{ fingerprint.visitorId }}</p>
      <h3 class="h6 mt-4">Components:</h3>
      <table class="table table-striped table-hover custom-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in fingerprint.components" :key="key">
            <td>{{ key }}</td>
            <td>{{ stringifyValue(value.value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted  } from 'vue';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import { useRouter } from 'vue-router'; 


// const router = useRouter();
export default {
  methods: {
    goToFinalSurvey() {
      this.$router.push('/finalsurvey');
    }
  },
  setup() {
    let intervalID;
    const fingerprint = ref(null);

    const getFingerprint = async () => {
  try {
    // Get fingerprint details
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    // Check if navigator.getBattery is supported
    if (typeof navigator.getBattery === "function") {
      // Get battery details
      const battery = await navigator.getBattery();
      result.components["BattryLevel"] = {value: battery.level * 100 + "%"};
      result.components["BattreyCharging"] = {value: battery.charging ? "Charging" : "Not Charging"};
    } else {
      // Handle browsers where getBattery is not supported
      result.components["BattryLevel"] = {value: "Not Supported"};
      result.components["BattreyCharging"] = {value: "Not Supported"};
    }

    // Add UserAgent
    result.components["UserAgent"] = {value: navigator.userAgent};

    // Get Latitude and Longitude
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        result.components["Latitude"] = {value: position.coords.latitude};
        result.components["Longitude"] = {value: position.coords.longitude};
        result.components = filterImportantValues(result.components);
        fingerprint.value = {...fingerprint.value, ...result};  // Merge and update the fingerprint ref
      }, (error) => {
        console.error("Error fetching geolocation:", error);
        result.components["Latitude"] = {value: "Permission Denied"};
        result.components["Longitude"] = {value: "Permission Denied"};
        result.components = filterImportantValues(result.components);
        fingerprint.value = {...fingerprint.value, ...result};  // Merge and update the fingerprint ref
      });
    } else {
      result.components["Latitude"] = {value: "Not Supported"};
      result.components["Longitude"] = {value: "Not Supported"};
      result.components = filterImportantValues(result.components);
      fingerprint.value = result; 
    }

    // Ensure ClientDateTime is set before starting the interval
    if (!result.components["Your Time"]) {
      result.components["Your Time"] = {value: new Date().toLocaleString()};
    }

    // Start an interval to update the Date and Time every second
    intervalID = setInterval(() => {
      if (fingerprint.value && fingerprint.value.components["Your Time"]) {
        fingerprint.value.components["Your Time"].value = new Date().toLocaleString();
      }
    }, 1000);
  } catch (error) {
    console.error("Error fetching fingerprint:", error);
  }
};


onUnmounted(() => {
  clearInterval(intervalID);
});
    const filterImportantValues = (components) => {
      // Updated list of properties to keep based on your request
      const importantKeys = [
      "UserAgent",  "vendor", "timezone", "languages", "platform", 
         "cookiesEnabled", "applePay", "vendorFlavors", "BattryLevel",
         "BattreyCharging", "fonts", "Latitude", "Longitude", "Your Time"
      ];

      return Object.keys(components)
        .filter(key => importantKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = components[key];
          return obj;
        }, {});
    };

    const stringifyValue = (value) => {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
      } else if (typeof value === 'string' && value.length > 100) {
        return value.substring(0, 100) + '...'; // Truncate long strings and add ellipsis
      } else {
        return value;
      }
    };

    return {
      fingerprint,
      getFingerprint,
      stringifyValue,
    };
    
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>

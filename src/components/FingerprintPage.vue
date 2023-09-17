<template>
  <div class="container mt-5">
    <p class="h4">Do you want to see your web fingerprint?</p>
    <button @click="getFingerprint" class="btn btn-primary mt-3">YES</button>
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
import { ref } from 'vue';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default {
  setup() {
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

    // Fetch timezone details
    try {
      result.components["Timezone"] = {value: Intl.DateTimeFormat().resolvedOptions().timeZone};
    } catch (err) {
      result.components["Timezone"] = {value: "Error fetching timezone"};
    }

    result.components = filterImportantValues(result.components);
    fingerprint.value = result;

  } catch (error) {
    console.error("Error fetching fingerprint:", error);
  }
};



    const filterImportantValues = (components) => {
      // Updated list of properties to keep based on your request
      const importantKeys = [
        "fonts", "vendor", "timezone", "languages", "platform", 
         "cookiesEnabled", "applePay", "vendorFlavors", "BattryLevel",
         "BattreyCharging"
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
      stringifyValue
      
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

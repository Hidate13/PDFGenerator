<template>
  <v-divider :thickness="5"></v-divider>
  <h1 class="d-flex justify-center">Dashboard</h1>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-chart-line</v-icon> Sales Overview
          </v-card-title>
          <v-card-text>
            <!-- Include a chart here -->
            <v-progress-circular
              :value="70"
              size="100"
              width="15"
              color="primary"
              >70%</v-progress-circular
            >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-account</v-icon> User Activity
          </v-card-title>
          <v-card-text>
            <!-- Include user activity information here -->
            <v-progress-linear
              :value="50"
              color="secondary"
            ></v-progress-linear>
            <v-progress-linear :value="30" color="error"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-table</v-icon> Recent Transactions
          </v-card-title>
          <v-card-text>
            <!-- Include a table here -->
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Description</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/01/2024</td>
                  <td>Sale of product X</td>
                  <td class="text-right">$100.00</td>
                </tr>
                <tr>
                  <td>02/01/2024</td>
                  <td>Service Y</td>
                  <td class="text-right">$200.00</td>
                </tr>
                <!-- Add more rows as needed -->
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}

.v-card {
  margin-bottom: 20px;
}
</style>

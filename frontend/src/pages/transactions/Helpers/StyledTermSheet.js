// StyledTermSheet.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
// import PoppinsRegular from './fonts/Poppins-Regular.ttf';
// import PoppinsBold from './fonts/Poppins-Bold.ttf';

// Register Poppins font
// Font.register({
//   family: 'Poppins',
//   fonts: [
//     { src: PoppinsRegular, fontWeight: 'normal' },
//     { src: PoppinsBold, fontWeight: 'bold' },
//   ],
// });

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
});

const StyledTermSheet = ({ transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>
        {transaction?.termSheet === 'Signed' ? 'FACILITY TERMSHEET' : 'PRELIMINARY TERMSHEET'}
      </Text>
      <View style={styles.section}>
        <Text style={styles.subHeader}>IMPORTANT NOTICE:</Text>
        <Text style={styles.text}>
          We, [“the financier”] are pleased to provide you with a proposal of indicative terms...
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>PARTIES</Text>
        <Text style={styles.text}>
          Borrower / Applicant: {transaction.borrower_Applicant}
        </Text>
        <Text style={styles.text}>
          Mandated Lead Arranger and Bookrunner: {transaction.keyParties[0].parties.filter(item => item.type.roleName === "Buyer" || item.type.roleName === "Seller").map(item => item.name.details.name).join(", ")}
        </Text>
        <Text style={styles.text}>
          Key Parties: {transaction.keyParties[0].parties.map(item => item.name.details.name || item.name.details.givenName).join(", ")}
        </Text>
        <Text style={styles.text}>
          Lenders: {transaction.lenders}
        </Text>
        <Text style={styles.text}>
          International Facility Agent: {transaction.keyParties[0].parties.filter(item => item.type.roleName === "International Facility Agent").map(item => item.name.details.name).join(", ")}
        </Text>
        <Text style={styles.text}>
          Local Administrative Agent (“LAA”): {transaction.keyParties[0].parties.filter(item => item.type.roleName === "Local Administrative Agent").map(item => item.name.details.name).join(", ")}
        </Text>
      </View>
      {/* Add more sections as needed */}
    </Page>
  </Document>
);

export default StyledTermSheet;

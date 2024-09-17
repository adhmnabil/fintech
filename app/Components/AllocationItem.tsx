import React from 'react'
import { Text, View } from 'react-native';
import { AllocationItemProps } from '../../interfaces/interfaces';

const AllocationItem : React.FC<AllocationItemProps> = ({ label, name, percentage, color , styles }) => (
    <View style={styles.allocationItem}>
      <View style={[styles.allocationIcon, { backgroundColor: color }]}>
        <Text style={styles.allocationIconText}>{label}</Text>
      </View>
      <View style={styles.allocationDetails}>
        <Text style={styles.allocationName}>{name}</Text>
        <Text style={styles.allocationPercentage}>{percentage}</Text>
      </View>
    </View>
  );

  export default AllocationItem
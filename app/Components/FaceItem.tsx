import React from 'react'
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {FactItemProps} from '../../interfaces/interfaces'

const FactItem :React.FC<FactItemProps> = ({ label, value , styles }) => (
    <View style={styles.factItem}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
      <AntDesign name="questioncircleo" size={20} color="rgba(188, 188, 188, 1)" />
    </View>
  );

  export default FactItem
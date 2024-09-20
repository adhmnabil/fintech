import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormContext } from '../Store/Store';
import { CreateGoalProps } from '../../interfaces/interfaces';
import { useAnalytics } from '@segment/analytics-react-native';

const CreateGoal: React.FC<CreateGoalProps> = ({ styles }) => {
  const { formData, updateFormData } = useFormContext();
  const goalName = formData.goalName || '';
  const { track } = useAnalytics();
  const [imageUri, setImageUri] = useState(require('../images/bank.png')); 

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need media library permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri }); 
    }
  };

  return (
    <View>
      <Text style={styles.title}>Create a Goal</Text>
      <Text style={styles.subtitle}>
        Write the name of the item or experience you’re saving for.
      </Text>

      <LinearGradient
        colors={['rgba(216, 215, 255, 1)', 'rgba(242, 241, 255, 1)']}
        style={styles.imageContainer}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{ padding: 20, backgroundColor: 'rgba(255, 244, 216, 1)', borderRadius: 50 }}
        >
          <Image source={imageUri} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <Ionicons 
          name="pencil" 
          size={18} 
          color="#625EEE" 
          style={styles.editIcon} 
          onPress={pickImage}  
        />
      </LinearGradient>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={goalName}
          onChangeText={(text) => {
            updateFormData('goalName', text);
            track('goal updated', {
              goalchoosenNotConfirmed: formData.goalName,
            });
          }}
        />
      </View>
    </View>
  );
};

export default CreateGoal;

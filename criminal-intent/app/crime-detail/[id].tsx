import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import { Camera } from 'lucide-react-native';
import { CheckIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input"
import { CustomDateTimePicker } from '@/components/DateTimePicker';
import { useRouter } from 'expo-router';

// import crimes from '@/api/crimes.json';
import {
  getCrime,
  Crime,
  updateCrime
} from "@/store/CrimeStorage";

export default function Id() {
  const { id } = useLocalSearchParams();

  const [crime, setCrime] = useState({
    id: null,
    title: "",
    details: "",
    timestamp: new Date().toDateString(),
    solved: false,
  } as Crime);

  useEffect(() => {
    if (id === null) {
      console.log("No id found");
      return;
    }
    if (typeof id !== "string") {
      throw new Error("Invalid id found");
    }
    getCrime(id).then((c) => {
      if (c) {
        setCrime(c);
      }
    });
  }, [id]);

  const updateTitle = (text: string) => {
    setCrime({
      ...crime,
      title: text
    });
  }

  const updateDetails = (text: string) => {
    setCrime({
      ...crime,
      details: text
    });
  }

  const updateTimestamp = (timestamp: Date) => {
    setCrime({
      ...crime,
      timestamp: timestamp.toDateString()
    });
  }

  const updateSolved = (value: boolean) => {
    setCrime({
      ...crime,
      solved: value
    });
  }

  const router = useRouter();

  const updateCurrentCrime = () => {
    updateCrime(crime);
    router.push("/");
  }

  return (
    <Card>
      <VStack className="gap-4">
        <HStack className="gap-4">
          <Box className="gap-4">
            <Image className="bg-gray-400" size="xl" source={{
              uri: "@/assets/icon.png"
            }} alt="image" />
            <Button variant="outline">
              <ButtonIcon as={Camera}/>
            </Button>
          </Box>
          <Box className="w-[67%]">
            <Heading>{crime.title}</Heading>
            <Input
              variant="underlined"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="Enter Text here..." onChangeText={(text) => updateTitle(text)}/>
            </Input>
          </Box>
        </HStack>
        <Textarea
          size="lg"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
        >
          <TextareaInput placeholder="Your text goes here..." onChangeText={(text) => updateDetails(text)}/>
        </Textarea>
        <CustomDateTimePicker date={new Date(crime.timestamp)} setDate={updateTimestamp}/>
        <Checkbox value={crime.solved.toString()} onChange={(selected) => updateSolved(selected)} size="md" isInvalid={false} isDisabled={false}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Solved</CheckboxLabel>
        </Checkbox>
        <Button>
          <ButtonText onPress={updateCurrentCrime}>Save</ButtonText>
        </Button>
      </VStack>
    </Card>
  )
}
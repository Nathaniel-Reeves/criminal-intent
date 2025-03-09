import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FlatList, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// import crimes from "@/api/crimes.json";
import { getCrimes, Crime, clearCrimes } from "@/store/CrimeStorage";

export default function Home() {

  // const data = JSON.parse(JSON.stringify(crimes));

  const [data, setData] = useState([] as Crime[]);

  useEffect(() => {
    getCrimes().then((crimes) => {
      setData(crimes);
    });
  }, [data]);

  // clearCrimes();

  const router = useRouter();

  return (
    <Box className="p-2 h-full">
      {data.length === 0 ? <EmptyCrimeListCard /> : null}
      <FlatList data={data} renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            router.push(`/crime-detail/${item.id}`);
          }}
        >
          <CrimeCard crime={item} />
        </Pressable>
      )}>
      </FlatList>
    </Box>
  );
}

function CrimeCard({ crime }: { crime: Crime }) {
  return (
    <Card
      key={crime.id}
      variant="elevated"
      className="gap-4 m-2"
    >
      <HStack className="flex-row justify-between">
        <Box>
          <Heading size="md">{ crime.title }</Heading>
          <Text>{ new Date(crime.timestamp).toLocaleDateString() }</Text>
        </Box>
        {crime.solved ? <Icon as={ShieldCheck} size="xl"/> : null}
      </HStack>
    </Card>
  )
}

function EmptyCrimeListCard() {
  return (
    <Card
      variant="elevated"
      className="gap-4 m-2"
    >
      <HStack className="flex-row justify-between">
        <Box>
          <Heading size="md">No Crimes Yet</Heading>
        </Box>
      </HStack>
    </Card>
  )
}

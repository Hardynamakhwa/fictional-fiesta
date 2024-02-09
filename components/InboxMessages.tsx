import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { View, Text, SectionList } from "react-native";

type message = {
    id: string;
    content: string;
    timestamp: string;
}

type messagesSection = {
    title: string;
    data: message[];
}

export default function InboxMessages()
{
    const { address } = useLocalSearchParams();
    const messages: message[] = [{ id: '1', content: 'hello', timestamp: '1' }];
    const sectionedMessages: messagesSection[] = [{ title: '1 feb, 2024', data: messages }];

    if (_.isEmpty(messages))
    {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No messages</Text>
            </View>
        );
    }

    return (
        <SectionList className="flex-1 flex w-full" sections={sectionedMessages} renderItem={MessageItem} renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>} keyExtractor={(item) => item.id} />
    );
}

function MessageItem({ item }: { item: message })
{
    return (
        <View className="rounded-xl self-start p-4 bg-white ">
            <Text>{item.content}</Text>
        </View>
    );
}
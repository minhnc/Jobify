import { useState } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppTheme } from "@app/../App"
import NearbyJobs from "@app/components/NearbyJobs"
import useFetch from "@app/hooks/useFetch"

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("Python");

    const { data, isLoading, error } = useFetch("search", {
        query: searchTerm,
    });

    const { colors, spacing } = useAppTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ flex: 1, padding: spacing.md }}>
                    <NearbyJobs
                        data={data?.data}
                        isLoading={isLoading}
                        error={error}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
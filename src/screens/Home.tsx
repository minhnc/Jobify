import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppTheme } from "@app/../App"
import NearbyJobs from "@app/components/NearbyJobs"

const Home = () => {
    const { colors, spacing } = useAppTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ flex: 1, padding: spacing.md }}>
                    <NearbyJobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
import { ActivityIndicator, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import NearbyJobCard from "./NearbyJobCard"
import type { Job } from "@app/types"
import { useAppTheme } from "@app/../App"

type NearbyJobsProps = {
    data?: Array<Job>,
    isLoading: boolean,
    error: unknown
}

const NearbyJobs = ({ data, isLoading, error }: NearbyJobsProps) => {
    const theme = useAppTheme()

    return (
        <>
            <Text variant="headlineMedium">Jobs near you</Text>

            <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}>
                {isLoading ?
                    (<ActivityIndicator size="large" color={theme.colors.primary} />)
                    : error ? (
                        <Text variant="titleMedium">Oops...</Text>
                    ) : (
                        data?.map((job) => (
                            <NearbyJobCard
                                key={`nearby-jobs-${job.job_id}`}
                                job={job}
                            />
                        ))
                    )}
            </View>
        </>
    )
}

export default NearbyJobs
import { ActivityIndicator, FlatList, View } from "react-native"
import { Text } from "react-native-paper"
import JobCard from "./JobCard"
import type { Job } from "@app/types"
import { useAppTheme } from "@app/../App"

type PopularJobsProps = {
    data?: Array<Job>,
    isLoading: boolean,
    error: unknown
}

const PopularJobs = ({ data, isLoading, error }: PopularJobsProps) => {
    const theme = useAppTheme()

    return (
        <>
            <Text variant="headlineMedium">Popular jobs</Text>

            <>
                {isLoading ?
                    (<ActivityIndicator size="large" color={theme.colors.primary} />)
                    : error ? (
                        <Text variant="titleMedium">Oops...</Text>
                    ) : (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => `popular-jobs-${item.job_id}`}
                            renderItem={({ item }) => <JobCard job={item} />}
                            contentContainerStyle={{ columnGap: theme.spacing.md }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
            </>
        </>
    )
}

export default PopularJobs
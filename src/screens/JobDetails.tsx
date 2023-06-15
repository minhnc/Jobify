import { useState } from "react";
import { FlatList, Linking, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Avatar, Badge, Button, Card, Chip, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"

import { useAppTheme } from "@app/../App"
import JobIcon from "@app/components/JobIcon";
import useFetch from "@app/hooks/useFetch";

import type { Job } from '@app/types';
import type { HomeStackNav } from "@app/nav/types";

type JobDetailsProps = {
    isLoading: boolean
    error: any
    job?: Job
}

const CompanyInfo = ({ job }: { job: Job }) => (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <JobIcon size={100} url={job.employer_logo} />
        <Text variant="headlineMedium">{job.job_title}</Text>
        <Text variant="bodyLarge">{job.employer_name} / {job.job_city}</Text>
    </View>
)

const filters = ["About", "Qualifications", "Responsibilities"];


type FiltersProps = {
    activeFilter: string
    setActiveFilter: (f: string) => void
}
const Filters = ({ activeFilter, setActiveFilter }: FiltersProps) => {
    const { spacing } = useAppTheme()

    return (
        <FlatList
            data={filters}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <Chip selected={item === activeFilter} onPress={() => setActiveFilter(item)}>{item}</Chip>
            )}
            contentContainerStyle={{ columnGap: spacing.md }}
            keyExtractor={item => item}
        />
    )
}

const Content = ({ title, points }: { title: string, points: string[] }) => {
    const { colors, spacing } = useAppTheme()

    return (
        <>
            <Text variant="headlineSmall">{title}:</Text>
            {
                points.length === 1 ? (
                    <Text variant="bodyLarge">{points[0]}</Text>
                ) : (
                    points.map((point, index) => (
                        <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: spacing.sm }}>
                            <View style={{ width: 8, height: 8, borderRadius: 4, marginTop: 8, backgroundColor: colors.primary }} />
                            <Text variant="bodyLarge">{point}</Text>
                        </View>
                    ))
                )
            }

        </>
    )
}

const ContentWrapper = ({ activeFilter, job }: { activeFilter: string, job: Job }) => {
    switch (activeFilter) {
        case 'Qualifications':
        case 'Responsibilities':
            return (
                <Content
                    title={activeFilter}
                    points={job.job_highlights?.[activeFilter] ?? ["N/A"]}
                />
            )

        default: // About
            return (
                <Content
                    title={activeFilter}
                    points={[job.job_description ?? "N/A"]}
                />
            )
    }

}

const JobDetails = ({ isLoading, error, job }: JobDetailsProps) => {
    const { colors, spacing } = useAppTheme()
    const [activeFilter, setActiveFilter] = useState(filters[0])

    if (isLoading) return <ActivityIndicator size="large" color={colors.primary} />

    if (error) return <Text variant="titleMedium">Oops...</Text>

    if (!job) return <Text variant="titleMedium">No data available</Text>

    return (
        <View style={{ flex: 1, gap: spacing.lg }}>
            <CompanyInfo job={job} />
            <Filters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />
            <ContentWrapper activeFilter={activeFilter} job={job} />
        </View>
    )
}

const JobFooter = ({ url }: { url: string }) => {
    const { colors, spacing } = useAppTheme()

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.xxl }}>
            <IconButton
                icon="heart-outline"
                iconColor={colors.primary}
                size={40}
                onPress={() => console.log('Pressed')}
            />
            <Button mode="contained" onPress={() => Linking.openURL(url)}>Apply Now</Button>
        </View>
    )
}

export default function ({ route }: NativeStackScreenProps<HomeStackNav, 'JobDetails'>) {
    const { colors, spacing } = useAppTheme()
    const { jobId } = route.params

    const { data, isLoading, error, refetch } = useFetch("job-details", {
        job_id: jobId,
    });

    const job = data?.data.length ? data?.data[0] : undefined;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: spacing.md, marginBottom: spacing.xl }}>
                    <JobDetails
                        isLoading={isLoading}
                        error={error}
                        job={job}
                    />
                </ScrollView>

                {
                    job && <JobFooter url={job.job_google_link} />
                }
            </>
        </SafeAreaView>
    )
}
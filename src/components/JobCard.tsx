import { Card, Text } from "react-native-paper"
import { Job } from "@app/types"
import JobIcon from "./JobIcon"
import { useNavigation } from "@react-navigation/native"

export enum Mode {
    compact,
    full
}

type JobCardProps = {
    job: Job
    mode?: Mode
}

const JobCard = ({ job, mode = Mode.compact }: JobCardProps) => {
    const navigation = useNavigation()

    const cardPress = () => {
        navigation.navigate('JobDetails', { jobId: job.job_id })
    }

    const width = mode === Mode.full ? 250 : '100%'

    return (
        <Card mode="contained" contentStyle={{ width }} onPress={cardPress}>
            <Card.Title
                title={job.job_title} titleVariant="titleMedium"
                subtitle={job.job_city}
                left={
                    props => <JobIcon {...props} url={job.employer_logo} />
                } />

            {
                mode === Mode.full && (
                    <Card.Content>
                        <Text variant="titleLarge">{job.employer_name}</Text>
                        <Text variant="bodyMedium">{job.job_publisher}</Text>
                    </Card.Content>
                )
            }
        </Card >
    )
}
export default JobCard
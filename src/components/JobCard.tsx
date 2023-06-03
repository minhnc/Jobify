import { Card, Text } from "react-native-paper"
import { Job } from "@app/types"
import JobIcon from "./JobIcon"

export enum Mode {
    compact,
    full
}

const JobCard = ({ job, mode = Mode.compact }: { job: Job, mode?: Mode }) => (
    <Card mode="contained" contentStyle={{ width: 250 }}>
        <Card.Title
            title={job.job_title} titleVariant="titleMedium"
            subtitle={job.job_city}
            left={
                props => <JobIcon {...props} url={job.employer_logo} />
            } />

        {mode === Mode.full && (
            <Card.Content>
                <Text variant="titleLarge">{job.employer_name}</Text>
                <Text variant="bodyMedium">{job.job_publisher}</Text>
            </Card.Content>
        )}
    </Card>
)

export default JobCard
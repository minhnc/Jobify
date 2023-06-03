import { Card } from "react-native-paper"
import { Job } from "@app/types"
import JobIcon from "./JobIcon"

const NearbyJobCard = ({ job }: { job: Job }) => (
    <Card mode="contained">
        <Card.Title
            title={job.job_title} titleVariant="titleMedium"
            subtitle={job.job_city}
            left={
                props => <JobIcon {...props} url={job.employer_logo} />
            } />
    </Card>
)

export default NearbyJobCard
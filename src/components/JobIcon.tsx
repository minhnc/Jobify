import { checkImageURL } from "@app/utils"
import { Image } from "react-native"

const JobIcon = ({ size, url }: { size: number, url?: string }) => {
    const jobIcon = checkImageURL(url) ? { uri: url } : require('@app/../assets/job.png')

    return (
        <Image
            source={jobIcon}
            resizeMode="contain"
            style={{ width: size, height: size }}
        />
    )
}

export default JobIcon
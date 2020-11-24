/* eslint-disable indent */
module.exports = async (meetingsObj, user_info) => {

    let arrayOfMeetings = [];

    for (let meeting of meetingsObj.meetings) {

        let video_download_url = '';
        let audio_download_url = '';
        let transcript_download_url = '';
        let chat_download_url = '';

        for (let recording_file of meeting.recording_files) {
            if (recording_file.recording_type === 'audio_transcript') {
                transcript_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;
            } else if (recording_file.file_type === 'MP4') {
                video_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;
            } else if (recording_file.recording_type === 'audio_only') {
                audio_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;
            } else if (recording_file.recording_type === 'chat_file') {
                chat_download_url = `${recording_file.download_url}?access_token=${user_info.access_token}`;
            }
        }

        let meetingObj = {
            user_name: user_info.user_name,
            pic_url: user_info.user_name,
            host_id: meeting.host_id,
            topic: meeting.topic,
            start_time: meeting.start_time,
            share_url: meeting.share_url,
            duration: meeting.duration,
            transcript_download_url,
            video_download_url,
            audio_download_url,
            chat_download_url
        };

        arrayOfMeetings.push(meetingObj);

    }

    console.log('------------------------------------');
    console.log(arrayOfMeetings);
    console.log('------------------------------------');
    return arrayOfMeetings;
}
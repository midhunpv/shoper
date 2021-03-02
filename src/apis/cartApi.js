import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:3003",
    onDownloadProgress(progressEvent) {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    }
})
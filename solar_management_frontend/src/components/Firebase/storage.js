import { getStorage } from "firebase/storage";

import app from "./Firebase";

const storage = getStorage(app);
export default storage
import { createContext } from "react";
import { getUserData } from "./helpers/helper";

export const UserContext = createContext(getUserData());

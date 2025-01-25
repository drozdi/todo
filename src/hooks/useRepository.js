import { useMemo } from "react";
import { BaseRepository } from "../utils/BaseRepository";

export default function useRepository(endpoint) {
	return useMemo(() => {
		return new BaseRepository(endpoint)
	}, [endpoint])
}
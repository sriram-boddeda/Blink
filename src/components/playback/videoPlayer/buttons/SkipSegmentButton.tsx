import { Button } from "@mui/material";
import React from "react";
import { useShallow } from "zustand/shallow";
import { usePlaybackStore } from "@/utils/store/playback";

const SkipSegmentButton = () => {
	const { mediaSegments, currentSegmentIndex, skipSegment, activeSegmentId } =
		usePlaybackStore(
			useShallow((state) => ({
				mediaSegments: state.metadata.mediaSegments,
				currentSegmentIndex: state.nextSegmentIndex - 1,
				skipSegment: state.skipSegment,
				activeSegmentId: state.activeSegmentId,
			})),
		);

	console.info("Active segment ID:", activeSegmentId);
	console.info("Current segment index:", currentSegmentIndex);
	console.info("Media segments:", mediaSegments?.Items);
	if (
		!mediaSegments?.Items?.length ||
		currentSegmentIndex < 0 ||
		!activeSegmentId
	) {
		return <></>; // No segments to skip
	}

	return (
		<Button
			variant="outlined"
			size="large"
			//@ts-ignore
			color="white"
			style={{
				position: "absolute",
				bottom: "18vh",
				right: "2em",
				zIndex: 10000,
			}}
			onClick={skipSegment}
		>
			Skip {mediaSegments?.Items?.[currentSegmentIndex].Type}
		</Button>
	);
};

const SkipSegmentButtonMemo = React.memo(SkipSegmentButton);

export default SkipSegmentButtonMemo;

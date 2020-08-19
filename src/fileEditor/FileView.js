import React, { useState } from "react";
import InfoView from "./infoView";
import styled from "styled-components";
import Actions from "./actions";
import LogView from "./LogView";

import { msToTime } from "../utils";

const electron = window.require("electron");
const id3 = electron.remote.require("./id3");

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	height: 100%;
`;

const RightPanel = styled.div`
	display: grid;
	grid-template-rows: 4fr 1fr;
`;

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);
	if (tags === undefined) {
		setTags(id3.getTags(path) || {});
		return <div>Loading...</div>;
	}

	return (
		<Wrapper>
			<InfoView info={tags} setInfo={(tags) => setTags(tags)}></InfoView>
			<div>
				<p>Chapters: {tags.chapter?.length || 0}</p>
				<ul>
					{tags.chapter.map((chapter) => (
						<li>
							{chapter.tags.title}: {msToTime(chapter.startTimeMs)} - {msToTime(chapter.endTimeMs)}
						</li>
					))}
				</ul>
			</div>
			<RightPanel>
				<LogView></LogView>
				<Actions path={path} setTags={() => id3.setTags(path, tags)} image={tags.image} length={tags.length}></Actions>
			</RightPanel>
		</Wrapper>
	);
}

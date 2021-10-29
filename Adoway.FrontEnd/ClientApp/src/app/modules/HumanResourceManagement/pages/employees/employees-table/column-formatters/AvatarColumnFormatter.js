// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function AvatarColumnFormatter(cellContent, row) {
    return (
        <>
            <div
                className="image-input image-input-outline"
                id="kt_profile_avatar"
                style={{
                    backgroundImage: `url(${toAbsoluteUrl(
                        "/media/users/blank.png"
                    )}`,
                }}
            >
                <div
                    className="image-avatar-wrapper"
                    style={{ backgroundImage: `url(${row.avatarUrl})` }}
                />
            </div>
        </>
    );
}

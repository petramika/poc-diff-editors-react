import { Diff, Hunk, parseDiff, tokenize } from 'react-diff-view';
//import DiffView from '../utils/Expansion';
import * as refractor from 'refractor';
import { gitChangesFormat, rawFileSimulator } from '../utils/data';
import { useEffect, useMemo, useState } from 'react';
import 'prism-themes/themes/prism-vs.css';
import 'react-diff-view/style/index.css';

const EMPTY_HUNKS: never[] = [];

const ReactDiffView = () => {
    const [{ type, hunks }, setDiff] = useState('');

    const tokens = useMemo(() => {
        if (!hunks) {
            return undefined;
        }
        const options = {
            refractor,
            highlight: true,
            language: 'xml',
        };

        try {
            return tokenize(hunks, options);
        } catch (ex) {
            return undefined;
        }
    }, [hunks]);

    useEffect(() => {
        const [diff] = parseDiff(gitChangesFormat, { nearbySequences: 'zip' });
        setDiff(diff);
    }, [])


    return (
        <div>
            <Diff
                viewType="unified"
                diffType={type}
                hunks={hunks || EMPTY_HUNKS}
                tokens={tokens}
                //oldSource={rawFileSimulator}
                //onExpandRange={() => console.log("HIII")}
            >
                {(hunks) => hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
            </Diff>
        </div>
    );
}

export default ReactDiffView
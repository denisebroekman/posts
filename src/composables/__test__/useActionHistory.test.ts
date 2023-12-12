import { expect, test, describe, beforeEach } from 'vitest';
import { useActionHistory } from '../useActionHistory';

const { actionHistory, addActionToHistory, rewindHistory } = useActionHistory();

const allPostsMock: Post[] = [
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
];

const firstActionMock: Action = {
    postOrder: [1, 2, 3],
    currentPost: {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    currentIndex: 0,
    targetIndex: 1,
};

const secondActionMock: Action = {
    postOrder: [2, 1, 3],
    currentPost: {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    currentIndex: 1,
    targetIndex: 2,
};

const sortedPostsForFirstHistoryItemMock: Post[] = [
    {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Lorem ipsum',
    },
    {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Lorem ipsum',
    },
];

const firstActionHistoryMock: Action[] = [firstActionMock];
const secondActionHistoryMock: Action[] = [secondActionMock, firstActionMock];
let allPosts: Post[] = allPostsMock;

beforeEach(() => {
    actionHistory.value = [];
    allPosts = allPostsMock;
});

describe('useActionHistory', () => {
    test('addActionToHistory should add the correct history entry to the history ref', async () => {
        addActionToHistory(firstActionMock);

        expect(actionHistory.value).toStrictEqual(firstActionHistoryMock);
    });
    test('addActionToHistory should add a second action to the top of the history ref array', async () => {
        addActionToHistory(firstActionMock);
        addActionToHistory(secondActionMock);

        expect(actionHistory.value).toStrictEqual(secondActionHistoryMock);
    });
    test('rewindHistory should set the history ref array to the correct state', async () => {
        addActionToHistory(firstActionMock);
        addActionToHistory(secondActionMock);

        rewindHistory({ allPosts, historyIndex: 0 });

        expect(actionHistory.value).toStrictEqual(firstActionHistoryMock);
    });
    test('rewindHistory should return the correct page object when rewinding to the first action in the list', async () => {
        addActionToHistory(firstActionMock);
        addActionToHistory(secondActionMock);

        const snapshot = rewindHistory({ allPosts, historyIndex: 0 });

        expect(snapshot).toStrictEqual(sortedPostsForFirstHistoryItemMock);
    });
    test('rewindHistory should empty out the history array if the last action was rewound', async () => {
        addActionToHistory(firstActionMock);
        addActionToHistory(secondActionMock);

        rewindHistory({ allPosts, historyIndex: 1 });

        expect(actionHistory.value).toStrictEqual([]);
    });
});

var defaultThreads = [
    {
        id: 1,
        title: "Is anyone stuck at the North gate due to traffic?",
        author: "Eugene",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Tas",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Ian",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    },
    {
        id: 2,
        title: "What skills am I learning by picking up garbage?",
        author: "Eugene",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Tas",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Ian",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    }
]

var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}
# Task
Create a tiny API that uses some web framework in Node.js to expose an http endpoint that takes an rss url, parses it and returns a list of episodes from that rss feed. Should be REST (-ish). Any parse errors that are returned by the parsing module should propagate in a nice way to the client. Also, for each episode, fetch and include in the result a checksum of the MP3 file for the episode. The resulting json should look something like this:
```
[
  { title: 'Episode 1 - abc', checksum: 123, url: 'xyz' },
  { title: 'Episode 2 - abc', checksum: 234, url: 'qwe' }
]
```

Also cover parts of the project with unit test/s. Think about how you structure your files and folders, maintain good naming conventions, pick libraries for common tasks etc. Write the code as if this project would extend to more functionality and be maintainable by a team. Also jot down the trade offs you made, stuff you left out (if any) etc.

You can browse https://play.acast.com for shows and pick a rss url from there. Or you can use e.g. https://rss.acast.com/varvet. 

If you feel you have the time, you can also do this subtask: Extend the API with an extra endpoint that takes an episode url (to an mp3) and returns the id3 tag info (as a json).

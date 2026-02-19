const CHUNK_TO_SECONDS = new Map<string, number>([
  ["minute", 60],
  ["hour", 60 * 60],
  ["day", 24 * 60 * 60],
]);

class TweetCounts {
  tweets = new Map<string, [boolean, number[]]>();

  constructor() {}

  recordTweet(tweetName: string, time: number): void {
    const res = this.tweets.get(tweetName);

    if (res !== undefined) {
      res[0] = true;
      res[1].push(time);
    } else {
      this.tweets.set(tweetName, [false, [time]]);
    }
  }

  getTweetCountsPerFrequency(freq: string, tweetName: string, startTime: number, endTime: number): number[] {
    const res = this.tweets.get(tweetName)!;
    const [dirty, times] = res;

    if (dirty) {
      times.sort((a, b) => a - b);
      res[0] = false;
    }

    const chunk = CHUNK_TO_SECONDS.get(freq)!;
    const num_of_buckets = Math.ceil((endTime - startTime + 1) / chunk);
    const buckets = new Array<number>(num_of_buckets).fill(0);

    for (const time of times) {
      if (time < startTime) continue;
      if (time > endTime) break;

      const chunk_index = Math.floor((time - startTime) / chunk);
      buckets[chunk_index]++;
    }

    return buckets;
  }
}

/**
 * Your TweetCounts object will be instantiated and called as such:
 * var obj = new TweetCounts()
 * obj.recordTweet(tweetName,time)
 * var param_2 = obj.getTweetCountsPerFrequency(freq,tweetName,startTime,endTime)
 */

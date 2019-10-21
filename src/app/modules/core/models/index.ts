export interface ITermList {
  word: string;
  definition: string;
  permalink: string;
  author: string;
  current_vote: string;
  defid: number;
  example: string;
  thumbs_down: number;
  thumbs_up: number;
  written_on: string;
  sound_urls: any;
}

export interface ITermResponse {
  list: ITermList[];
}

export interface ITermResult {
  error: boolean;
  result: ITermResponse;
}

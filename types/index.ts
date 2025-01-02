export type Model = {
  id: string;
  name: string;
  image_url?: string;
};

export type EventRecord = {
  date: string;
  models: Model[] | Model;
};

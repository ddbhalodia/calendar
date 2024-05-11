interface DateDetails {
  year: number;
  month: number;
  date: number;
}

export const extractDateDetails = (dateString: string): DateDetails => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
  const date = dateObj.getDate();

  return {
    year,
    month,
    date,
  };
};

export const getImageThumbUrl = (events: any, isFull: boolean) => {
  const url: any = events?.map((item: any) =>
    isFull
      ? "../../src/Assets/webp/" + item?.imageFilenameFull + ".webp"
      : "../../src/Assets/webp/" + item?.imageFilenameThumb + ".webp"
  );
  return url[0];
};

export const formatAvalibleDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  console.log("dateString",dateString)
  return date.toLocaleDateString('en-US', options);
};
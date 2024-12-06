interface Info {
  message: string | null | undefined;
  error: string;
}

export default function danger({ message = "", error }: Info) {
  return (
    <section className="flex flex-col gap-2 w-full border border-red-800  rounded-lg p-8 mt-4">
      <h2 className="text-red-800 font-medium text-xl">{error}</h2>
      <p className="text-zinc-50 font-normal text-base">{message}</p>
    </section>
  );
}

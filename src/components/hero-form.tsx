import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormSchedule from "./form-schedule";

export default function HeroFormCenterAlignedWithAForm() {
  return (
    <>
      <section className="flex w-full mx-auto p-4 sm:p-6 lg:p-12 justify-center align-middle">
        <div className="relative mx-auto max-w-7xl grid space-y-5 sm:space-y-10">
          <aside className="text-center">
            <p className="text-xl font-medium text-muted-foreground tracking-wide uppercase mb-3">
              Cnel outage Schedule
            </p>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Calendario de Cortes de Luz en Ecuador 2024
            </h1>
          </aside>
          {/* Avatar Group */}
          <article
            aria-label="community contributors"
            className="sm:flex sm:justify-center sm:items-center text-center sm:text-start"
          >
            <section className="pb-5 sm:flex sm:pb-0 sm:pe-5">
              <div className="flex justify-center -space-x-3">
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/72560306?v=4"
                    alt="@Savecoders"
                  />
                  <AvatarFallback>Save</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/75219404?v=4"
                    alt="@Darloscode"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/153582818?v=4"
                    alt="@RicardoVillamar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/145177733?v=4"
                    alt="@AbrahamzzZ"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {/* End Avatar Group */}
            </section>
            <div className="border-t sm:border-t-0 sm:border-s  w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0" />
            <aside className="pt-5 sm:pt-0 sm:ps-5">
              <a
                className="text-lg font-semibold hover:underline"
                href="https://github.com/Savecoders/cnel-outage-schedule"
              >
                Colaboradores
              </a>
              <p className="text-base text-muted-foreground">
                Personas que colaboraron en el Proyecto
              </p>
            </aside>
          </article>

          <FormSchedule />
        </div>
      </section>
    </>
  );
}

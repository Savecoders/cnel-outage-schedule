import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSearch from "./form-search";

export default function HeroFormCenterAlignedWithAForm() {
  return (
    <>
      <section className="flex w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 justify-center align-middle">
        <div className="relative mx-auto max-w-7xl grid space-y-5 sm:space-y-10">
          {/* Title */}
          <section className="text-center">
            <p className="text-xl font-semibold text-muted-foreground tracking-wide uppercase mb-3">
              Cnel outage Schedule
            </p>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Calendario de Cortes de Luz en Ecuador 2024
            </h1>
          </section>
          {/* Avatar Group */}
          <div className="sm:flex sm:justify-center sm:items-center text-center sm:text-start">
            <div className="pb-5 sm:flex sm:pb-0 sm:pe-5">
              <div className="flex justify-center -space-x-3">
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://github.com/Savecoders.png"
                    alt="@Savecoders"
                  />
                  <AvatarFallback>Save</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://github.com/Darloscode.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://github.com/RicardoVillamar.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 ">
                  <AvatarImage
                    src="https://github.com/AbrahamzzZ.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {/* End Avatar Group */}
            </div>
            <div className="border-t sm:border-t-0 sm:border-s  w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0" />
            <div className="pt-5 sm:pt-0 sm:ps-5">
              <div className="text-lg font-semibold">Colaboradores</div>
              <div className="text-sm text-muted-foreground">
                Personas que colaboraron en el Proyecto
              </div>
            </div>
          </div>

          <FormSearch />
        </div>
      </section>
    </>
  );
}

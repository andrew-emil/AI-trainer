import { trainersQuery } from "@/lib/queries/trainer.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import TrainerCard from "./TrainerCard";

function TrainersGrid() {
    const { data: trainers, error } = useSuspenseQuery(trainersQuery(true))
    const { t } = useTranslation();

    if (error) {
        return (
            <div className="text-center text-red-500 font-bold">Error: {error?.message}</div>
        )
    }

    if(trainers.length === 0) {
        return (
            <div className="text-center text-muted-foreground text-xl font-bold">{t('trainers.noTrainers')}</div>
        )
    }

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trainers.map((trainer, index) => (
                        <TrainerCard trainer={trainer} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrainersGrid
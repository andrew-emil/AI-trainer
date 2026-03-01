import { trainersQuery } from "@/lib/queries/trainer.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import TrainerCard from "./TrainerCard";
import { Activity } from "react";
import { useTranslation } from "react-i18next";

function TrainersGrid() {
    const { data, error } = useSuspenseQuery(trainersQuery(true))
    const { t } = useTranslation();
    const { data: trainers, error: trainersError } = data;

    if (error || trainersError) {
        return <div className="text-center text-red-500 font-bold">Error: {error?.message || trainersError?.message}</div>
    }

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                    <Activity mode={!trainers || trainers.length === 0 ? "visible" : "hidden"}>
                        <p className="text-center text-muted-foreground text-xl font-bold">{t('trainers.noTrainers')}</p>
                    </Activity>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Activity mode={trainers.length > 0 ? "visible" : "hidden"}>
                        {trainers.map((trainer, index) => (
                            <TrainerCard trainer={trainer} index={index} />
                        ))}
                    </Activity>
                </div>
            </div>
        </section>
    )
}

export default TrainersGrid
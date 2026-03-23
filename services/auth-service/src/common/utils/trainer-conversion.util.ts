export class TrainerConversionUtil {
  /**
   * Converts a Date back to years of experience (number)
   * Example: Date('2022-01-01') in 2026 -> 4 years
   */
  static convertDateToYears(date: Date | null | undefined): number {
    if (!date) return 0;
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();
    return Math.max(0, currentYear - dateYear);
  }

  /**
   * Converts years of experience (number) to a Date
   * Example: 4 years in 2026 -> Date('2022-01-01')
   */
  static convertYearsToDate(years: number): Date {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear - years;
    return new Date(targetYear, 0, 1); // January 1st of target year
  }

  /**
   * Safely transforms a trainer object in-place or returns a transformed copy.
   * Converts experienceYears from Date to number.
   */
  static transformTrainer(trainer: any): any {
    if (!trainer) return trainer;

    if (trainer.experienceYears instanceof Date) {
      trainer.experienceYears = this.convertDateToYears(
        trainer.experienceYears,
      );
    }
    return trainer;
  }

  /**
   * Safely transforms a user object that has a nested trainer.
   */
  static transformUserWithTrainer(user: any): any {
    if (!user) return user;

    if (user.trainer) {
      user.trainer = this.transformTrainer(user.trainer);
    }
    return user;
  }

  /**
   * Transforms a TrainerTrainee object which includes a trainer.
   */
  static transformTrainerTrainee(relation: any): any {
    if (!relation) return relation;

    if (relation.trainer) {
      relation.trainer = this.transformTrainer(relation.trainer);
    }
    return relation;
  }

  /**
   * Transforms a TrainerReview object which includes a trainer.
   */
  static transformTrainerReview(review: any): any {
    if (!review) return review;

    if (review.trainer) {
      review.trainer = this.transformTrainer(review.trainer);
    }
    return review;
  }

  /**
   * Transforms a TrainerRequest object which includes a user which includes a trainer.
   */
  static transformTrainerRequest(request: any): any {
    if (!request) return request;

    if (request.user) {
      request.user = this.transformUserWithTrainer(request.user);
    }
    return request;
  }
}

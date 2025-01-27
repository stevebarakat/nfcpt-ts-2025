"use client";
import { useState } from "react";
import Image from "next/image";
import { ReactGoogleReviews } from "react-google-reviews";
import { IoIosStar } from "react-icons/io";
import "react-google-reviews/dist/index.css";
import styles from "../Sidebar/sidebar.module.css";
import { Button } from "../Button";

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

type GoogleReview = any;

export default function Reviews() {
  // get api key from https://featurable.com
  const featurableWidgetId = "e5608580-702c-4ca8-b2b8-f03036a6f553";
  const [key, setKey] = useState(() => generateRandomNumber(0, 99));

  return (
    <ReactGoogleReviews
      structuredData={true}
      reviewVariant="testimonial"
      layout="custom"
      featurableId={featurableWidgetId}
      renderer={(reviews: GoogleReview[]) => {
        const filteredReviews = reviews.filter(
          (review) => review.comment.length > 0
        );

        const testimonials = filteredReviews.map((review) => {
          if (review.comment === "") {
            setKey(() => generateRandomNumber(0, reviews.length - 1));
          }

          const stars = Array.from({ length: review.starRating }, (_, i) => (
            <IoIosStar key={i} />
          ));

          // Limit review.comment to 148 characters
          const truncatedComment =
            review.comment.length > 148
              ? review.comment.slice(0, 148) + "..."
              : review.comment;

          return (
            <div className={styles.testimonial} key={review.id}>
              <div className={styles.testimonialImg}>
                <Image
                  src={review.reviewer.profilePhotoUrl}
                  alt={review.reviewer.displayName}
                  width={200}
                  height={200}
                />
              </div>
              <figcaption className={styles.testimonialAuthor}>
                {review.reviewer.displayName}
              </figcaption>
              <div className={styles.testimonialStars}>{stars}</div>
              <div>
                <blockquote>
                  <span className={styles.testimonial}>{truncatedComment}</span>
                </blockquote>
              </div>
              <Button
                style={{ cursor: "pointer" }}
                textColor="white"
                color="transparent"
                borderColor="white"
                className={styles.reviewBtn}
                onClick={() =>
                  setKey(generateRandomNumber(0, reviews.length - 1))
                }
              >
                read another review
              </Button>
            </div>
          );
        });
        return testimonials[key];
      }}
    />
  );
}

package movierental;

/**
 * The rental class represents a customer renting a movie.
 */
public record Rental(Movie movie, int daysRented) {

    int renterPoints() {
        if ((this.movie().price() != Price.NEW_RELEASE) || this.daysRented() <= 1) {
            return 1;
        }
        return 2;
    }

    double amount() {
        return movie.price().amountFor(this);
    }

}

package movierental;

/**
 * The rental class represents a customer renting a movie.
 */
public class Rental{

  private final Movie movie;
  private final int daysRented;

  Rental(Movie movie, int daysRented){

    this.movie = movie;
    this.daysRented = daysRented;
  }

  int renterPoints() {
        if ((this.movie.price() != Price.NEW_RELEASE) || this.daysRented <= 1) {
            return 1;
        }
        return 2;
    }

    double amount() {
        return movie.price().amountFor(this);
    }

  public String movieTitle() {
    return this.movie.title();
  }

  public int daysRented() {
    return this.daysRented;
  }
}

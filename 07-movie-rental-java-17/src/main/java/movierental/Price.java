package movierental;

import java.util.Arrays;
import java.util.function.Function;

public enum Price {


    REGULAR(0, rental -> {
        if (rental.daysRented() > 2) {
            return 2 + (rental.daysRented() - 2) * 1.5;
        }
        return 2D;
    }),
    NEW_RELEASE(1, rental -> 3D * rental.daysRented()),
    CHILDRENS(2, rental -> {
        if (rental.daysRented() > 3) {
            return 1.5 + (rental.daysRented() - 3) * 1.5;
        }
        return 1.5;
    }),
    DEFAULT(-1, rental -> 0D);

    final int priceCode;
    private final Function<Rental, Double> amountForRental;

    Price(int priceCode, Function<Rental, Double> amountForRental) {
        this.priceCode = priceCode;
        this.amountForRental = amountForRental;
    }

    public static Price fromCode(int priceCode) {
        return Arrays.stream(values())
                .filter(price -> priceCode == price.priceCode)
                .findFirst().orElse(DEFAULT);
    }

    public double amountFor(Rental rental) {
        return this.amountForRental.apply(rental);
    }

}

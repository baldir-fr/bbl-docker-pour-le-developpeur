package movierental;

import java.util.stream.Collectors;

public final class TextStatement {
    private TextStatement() {
        // no public constructor for utility class
    }

    public static String textStatement(Customer customer) {

        String result = "Rental Record for " + customer.getName() + "\n";
        result += titleAndAmounts(customer);
        result += "Amount owed is " + totalAmount(customer) + "\n";
        result += "You earned " + frequentRenterPoints(customer) + " frequent renter points";
        return result;
    }


    private static int frequentRenterPoints(Customer customer) {
        return customer.rentals.stream().mapToInt(Rental::renterPoints).sum();
    }

    private static String titleAndAmounts(Customer customer) {
        return customer.rentals.stream()
                .map(TextStatement::titleAndAmount)
                .collect(Collectors.joining("\n", "", "\n"));
    }

    private static String titleAndAmount(Rental rental) {
        return "\t" + rental.movie().title() + "\t" + rental.amount();
    }

    private static double totalAmount(Customer customer) {
        return customer.rentals.stream().mapToDouble(Rental::amount).sum();
    }

}

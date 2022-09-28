package movierental;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class CustomerTest {

    @Test
    public void test() {
        Customer customer = new Customer("Bob");
        customer.addRental(new Rental(new Movie("Jaws", Price.REGULAR), 2));
        customer.addRental(new Rental(new Movie("Golden Eye", Price.REGULAR), 3));
        customer.addRental(new Rental(new Movie("Short New", Price.NEW_RELEASE), 1));
        customer.addRental(new Rental(new Movie("Long New", Price.NEW_RELEASE), 2));
        customer.addRental(new Rental(new Movie("Bambi", Price.CHILDRENS), 3));
        customer.addRental(new Rental(new Movie("Toy Story", Price.CHILDRENS), 4));

        String expected = "" +
                          "Rental Record for Bob\n" +
                          "\tJaws\t2.0\n" +
                          "\tGolden Eye\t3.5\n" +
                          "\tShort New\t3.0\n" +
                          "\tLong New\t6.0\n" +
                          "\tBambi\t1.5\n" +
                          "\tToy Story\t3.0\n" +
                          "Amount owed is 19.0\n" +
                          "You earned 7 frequent renter points";

        assertEquals(expected, customer.statement());
    }
}
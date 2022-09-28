package movierental;

import java.util.ArrayList;
import java.util.List;

import static movierental.TextStatement.textStatement;

public class Customer {

    private final String name;
    final List<Rental> rentals = new ArrayList<>();

    public Customer(String name) {
        this.name = name;
    }
    
    public void addRental(Rental arg) {
        rentals.add(arg);
    }

    public String getName() {
        return name;
    }

    public String statement() {
        return textStatement(this);
    }


}

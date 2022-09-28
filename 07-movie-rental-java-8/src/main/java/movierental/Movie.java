package movierental;

public class Movie{

  private final String title;
  private final Price price;

  Movie(String title, Price price){

    this.title = title;
    this.price = price;
  }

  public Price price() {
    return price;
  }

  public String title() {
    return this.title;
  }
}

import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.grabStudentImages = this.grabStudentImages.bind(this);
    this.createImageAnimations = this.createImageAnimations.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ isVisible: true });
      }.bind(this),
      8000
    );
  }

  grabStudentImages(students) {
    const imageElements = students.map(student => {
      return this.createImageAnimations(student);
    });
    return imageElements;
  }

  createImageAnimations(student) {
    return (
      <img
        className="studentimages"
        key={student.id}
        className="dance"
        src={student.image}
      />
    );
  }

  createCrawlText(students, campuses) {
    //for extremely vital star wars css thing at home page
    const titleTexts = campuses.map(campus => {
      return (
        <h1
          key={campus.name}
          style={{
            fontSize: "1em",
            position: "relative",
            color: "rgb(253,209,48)",
            left: "30vw",
            transform: "skew(50deg)"
          }}
        >
          {campus.name}
          <br />
        </h1>
      );
    });

    const studentTexts = students.map(student => {
      return (
        <div
          key={student.name}
          style={{
            fontSize: ".6em",
            position: "relative",
            color: "rgb(253,209,48)",
            left: "30vw",
            transform: "skew(50deg)",
            textAlign: "center"
          }}
        >
          {student.name}
          <br />
        </div>
      );
    });
    return titleTexts.concat(studentTexts);
  }

  render() {
    console.log(this.state.isVisible)
    const isMounted = this.props.students.length > 0;
    //images will get image elements, text will be text elements
    let students = this.props.students,
      campuses = this.props.campuses,
      images = [],
      imagesOne = [],
      imagesTwo = [],
      imagesThree = [],
      imagesFour = [],
      text = [];
    if (isMounted) {
      //grab all images
      images = this.grabStudentImages(this.props.students);
      //grab all names
      text = this.createCrawlText(students, campuses);
      let i = 0;
      //b/c i do not understand css all that well, I had to make individual containers that contained a max of four images
      while (imagesOne.length < 11) {
        imagesOne[i] = images.pop();
        imagesTwo[i] = images.pop();
        imagesThree[i] = images.pop();
        imagesFour[i] = images.pop();
        i++;
      }
    }
    return (
      <div
        className="home"
        style={{
          overflow: "hidden",
          backgroundColor: "black",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
          background:
            "url(https://michaelspanofoundation.org/wp-content/uploads/2014/10/empty-spaces.jpg)no-repeat",
          backgroundSize: "cover"
        }}
      >
        <audio
          style={{
            position: "relative",
            top: "-200em"
          }}
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg"
          controls
          autoPlay
          loop
        />
        {this.state.isVisible && (
          <h1
            className="starwars"
            style={{
              fontSize: "4em",
              position: "fixed",
              color: "yellow",
              left: "30vw",
              transform: "skew(50deg)"
            }}
          >
            <div>{text}</div>
          </h1>
        )}
        {/*some reason couldn't get it to work w/ one isMounted*/}
        {isMounted && <div className="container">{imagesOne}</div>}
        {isMounted && <div className="container">{imagesTwo}</div>}
        {isMounted && <div className="container">{imagesThree}</div>}
        {isMounted && <div className="container">{imagesFour}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students,
  campuses: state.campuses
});

export default withRouter(connect(mapStateToProps)(Home));

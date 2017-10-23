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
      8500
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
        key={student.id}
        className="dance student-images"
        src={student.image}
      />
    );
  }

  createCrawlText(students, campuses) {
    //for extremely vital star wars css thing at home page
    const titleTexts = campuses.map(campus => {
      return (
        <h1 className="crawl-text" key={campus.name}>
          {campus.name}
          <br />
        </h1>
      );
    });

    const studentTexts = students.map(student => {
      return (
        <div className="crawl-text" key={student.name}>
          {student.name}
          <br />
        </div>
      );
    });
    return titleTexts.concat(studentTexts);
  }

  render() {
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
      //b/c i do not understand css all that well, I had to make individual containers that contained a max of a certain amount of images
      while (imagesOne.length < 11) {
        imagesOne[i] = images.pop();
        imagesTwo[i] = images.pop();
        imagesThree[i] = images.pop();
        imagesFour[i] = images.pop();
        i++;
      }
    }
    return (
      <div className="home">
        <audio
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg"
          controls
          autoPlay
          loop
        />
        {this.state.isVisible && (
          <div>
            <h1 className="starwars">
              <div>{text}</div>
            </h1>
            <div className="container">{imagesOne}</div>
            <div className="container">{imagesTwo}</div>
            <div className="container">{imagesThree}</div>
            <div className="container">{imagesFour}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.students,
  campuses: state.campuses
});

export default withRouter(connect(mapStateToProps)(Home));

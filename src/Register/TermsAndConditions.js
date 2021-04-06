import React, { Component } from 'react';
import '../App.css';
import { Scrollbars } from 'rc-scrollbars';
import { Form } from 'react-bootstrap';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
    };
  }

  checkIfBoxIsChecked(e) {
    let checked = document.getElementById('check');
    if (checked.checked == false) {
      e.preventDefault();
      this.setState({ isChecked: false });
    } else {
      this.setState({ isChecked: true });
    }
  }
  onCheckBoxChange() {
    let checked = document.getElementById('check');
    if (checked.checked == true) {
      this.setState({ isChecked: true });
    }
  }
  render() {
    return (
      <div className="col-md-8" style={{ 'margin-left': '350px' }}>
        <h2 className="PageTitle" style={{ 'margin-left': '255px' }}>
          Terms and Conditions
        </h2>
        <br></br>
        <Scrollbars style={{ width: 500, height: 300, marginLeft: 150 }}>
          <p>Some great content...</p>
          <p>
            Dog goes woof Cat goes meow Bird goes tweet And mouse goes squeek Cow goes moo Frog goes
            croak And the elephant goes toot Ducks say quack And fish go blub And the seal goes ow
            ow ow But theres one sound That no one knows What does the fox say?
            Ring-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding!
            Gering-ding-ding-ding-dingeringeding! What the fox say? Wa-pa-pa-pa-pa-pa-pow!
            Wa-pa-pa-pa-pa-pa-pow! Wa-pa-pa-pa-pa-pa-pow! What the fox say? Hatee-hatee-hatee-ho!
            Hatee-hatee-hatee-ho! Hatee-hatee-hatee-ho! What the fox say?
            Joff-tchoff-tchoffo-tchoffo-tchoff! Tchoff-tchoff-tchoffo-tchoffo-tchoff!
            Joff-tchoff-tchoffo-tchoffo-tchoff! What the fox say? Big blue eyes Pointy nose Chasing
            mice And digging holes Tiny paws Up the hill Suddenly youre standing still Your fur is
            red So beautiful Like an angel in disguise But if you meet A friendly horse Will you
            communicate by Mo-o-o-o-orse? Mo-o-o-o-orse? Mo-o-o-o-orse? How will you speak to that
            Ho-o-o-o-orse? Ho-o-o-o-orse? Ho-o-o-o-orse? What does the fox say?
            Jacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! What the
            fox say? Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow!
            What the fox say? A-hee-ahee ha-hee! A-hee-ahee ha-hee! A-hee-ahee ha-hee! What the fox
            say? A-oo-oo-oo-ooo! Woo-oo-oo-ooo! What does the fox say? The secret of the fox Ancient
            mystery Somewhere deep in the woods I know youre hiding What is your sound? Will we ever
            know? Will always be a mystery What do you say? Youre my guardian angel Hiding in the
            woods What is your sound? (Wa-wa-way-do, wub-wid-bid-dum-way-do, wa-wa-way-do) Will we
            ever know? (Bay-budabud-dum-bam) I want to (Mama-dum-day-do) I want to, I want to know!
            (Abay-ba-da bum-bum bay-do)
          </p>
        </Scrollbars>

        <br></br>
        <form style={{ marginRight: '380px' }}>
          <div className="form-group">
            <div className="form-check">
              <Form.Check
                required
                label="Agree to terms and conditions"
                isInvalid={!this.state.isChecked}
                feedback="You must agree before going to next step"
                onChange={this.onCheckBoxChange.bind(this)}
                id="check"
              />
            </div>
          </div>
        </form>

        <div style={{ marginLeft: '10px' }}>
          <div className="pagination" style={{ marginright: '130px' }}>
            <a className="page-link btn btn-outline-info" href="./Login">
              ❮ Previous
            </a>
            <a style={{ marginLeft: '600px' }}></a>
            <a
              className="page-link btn btn-outline-info"
              href="./SignUp"
              onClick={this.checkIfBoxIsChecked.bind(this)}
            >
              Next ❯
            </a>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
export default TermsAndConditions;

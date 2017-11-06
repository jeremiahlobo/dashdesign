 
    <div class= "add-btn">
        <label for="add" class="btn-floating btn-large waves-effect waves-light ">
        <a id="add" class="button-add modal-trigger" data-target="add-camera" href="#add-camera" ><i class="large material-icons">add</i></a>
      </label>
    </div>  


  <!-- Modal Structure -->
  <div id="add-camera" class="modal">
    <div class="modal-content">
      <h4>Add a New Camera</h4>
    <div class="row">
	    <form class="col s12">
	      <div class="row">
	        <div class="input-field col s6">
	          <input placeholder="Username or Admin Name" id="user_name" type="text" class="validate">
	          <label for="user_name">Username</label>
	        </div>
	         <div class="row">
        		<div class="input-field col s6">
          			<input id="password" type="password" class="validate">
          			<label for="password">Password</label>
        		</div>
      		</div>
	      </div>
	      <div class="row">
	            <div class="input-field col s12">
          			<input id="rstp-port" type="text" class="validate">
          			<label for="rstp-port">Rstp/Http Port</label>
        		</div>
	      </div>
        </form>
  </div>



    </div>
    <div class="modal-footer">
      <a href="#success" class="modal-action modal-close waves-effect waves-green btn-flat modal-trigger" data-target="success">Add My Cam</a>
    </div>
    
  </div>
	

  <!-- Modal Structure -->
  <div id="success" class="modal">
    <div class="modal-content">
      <h1 style = "color: #21A770">Success!!</h1>
      <p>Your Camera Has been added! Well Done!</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Okay</a>
    </div>

  </div>


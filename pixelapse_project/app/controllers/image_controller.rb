class ImageController < ApplicationController
  def index
	@image = Image.find_by_id(params[:id])
  end
  
  def new
	@image = Image.new()
	@image.date_time = DateTime.now
	@image.file_name = DateTime.now.to_time.to_i.to_s() + params[:image].original_filename
	
	directory = "public/images/"
	path = File.join(directory, @image.file_name)
	File.open(path,"wb"){ |f| f.write(params[:image].read) }
	
	@image.save()
	render :js =>  @image.id.to_s()
  end
end
